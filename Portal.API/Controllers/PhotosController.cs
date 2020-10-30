using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Portal.API.Data;
using Portal.API.DTOs;
using Portal.API.Helpers;
using Portal.API.Models;

namespace Portal.API.Controllers
{
    [Authorize]
    [Route("user/{userId}/photos")]
    public class PhotosController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public PhotosController(IUserRepository repository, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repository = repository;

            Account account = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                cloudinaryConfig.Value.ApiSecret
            );
            _cloudinary = new Cloudinary(account);

        }
        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId, [FromForm] PhotoForCreationDto photoForCreationDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var userFromRepo = await _repository.GetUser(userId);
            var file = photoForCreationDto.File;
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }
            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.Public_id = uploadResult.PublicId.ToString();
            var photo = _mapper.Map<Photo>(photoForCreationDto);

            if (!userFromRepo.Photos.Any(p => p.isMain))
                photo.isMain = true;

            userFromRepo.Photos.Add(photo);

            if (await _repository.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                var photoFromRepo = await _repository.GetPhoto(photo.Id);

                var photoForReturn = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

                return Ok(photoForReturn);

            }

            return BadRequest("Nie można dodać zdjęcia");
        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repository.GetPhoto(id);

            var photoForReturn = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photoForReturn);
        }
        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var user = await _repository.GetUser(userId);
            if (!user.Photos.Any(p => p.Id == id))
            {
                return Unauthorized();
            }
            var photoFromRepo = await _repository.GetPhoto(id);
            if (photoFromRepo.isMain)
                return BadRequest("Wybrane zdjęcie już jest zdjęciem głównym");

            var currentMainPhoto = await _repository.GetMainPhotoForUser(userId);
            currentMainPhoto.isMain = false;
            photoFromRepo.isMain = true;
            if (await _repository.SaveAll())
            {
                return NoContent();
            }
            return BadRequest("Nie można ustawić zdjęcia jako głównego");
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DelPhoto(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var user = await _repository.GetUser(userId);
            if (!user.Photos.Any(p => p.Id == id))
            {
                return Unauthorized();
            }
            var photoFromRepo = await _repository.GetPhoto(id);
            if (photoFromRepo.isMain)
                return BadRequest("Nie można usówac zdjęcia głównego");
            if (photoFromRepo.Public_id != null)
            {
                var delParams = new DeletionParams(photoFromRepo.Public_id);
                var result = _cloudinary.Destroy(delParams);

                if (result.Result == "ok")
                {
                    _repository.Delete(photoFromRepo);
                }
            }else{
                _repository.Delete(photoFromRepo);
            }
            if (await _repository.SaveAll())
            {
                return NoContent();
            }
            return BadRequest("Nie można usunąć zdjęcia");
        }
    }
}