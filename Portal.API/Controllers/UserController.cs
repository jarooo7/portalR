using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portal.API.Data;
using Portal.API.DTOs;
using Portal.API.Helpers;

namespace Portal.API.Controllers
{
    [Authorize]
    [ApiController]
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;
        public UserController(IUserRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery] UserParams userParams)
        {
                var users = await _repo.GetUsers(userParams);
                var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);
                Response.AddPagination(users.CurrantPage, users.PageSize, users.TotalCount, users.TotalPages);
                return Ok(usersToReturn);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            var userToReturn = _mapper.Map<UserForDetailedDto>(user);
            return Ok(userToReturn);
        }
         [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForDetailedDto)
        {
            if(id!= int.Parse( User.FindFirst(ClaimTypes.NameIdentifier).Value)){
                return Unauthorized("Nie masz dostępu do aktualizacji danych");
            }
            var userFromRepo = await _repo.GetUser(id);

            _mapper.Map(userForDetailedDto,userFromRepo);
            if(await _repo.SaveAll()){
                return NoContent();
            }
            throw new Exception ($"Aktualizacja użytkownika o id: {id} nie powiodła się");
        }

    }
}