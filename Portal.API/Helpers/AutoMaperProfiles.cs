using AutoMapper;
using Portal.API.DTOs;
using Portal.API.Models;

namespace Portal.API.Helpers
{
    public class AutoMaperProfiles:Profile
    {
        public AutoMaperProfiles()
        {
           CreateMap<User, UserForListDto>(); 
           CreateMap<User, UserForDetailedDto>(); 
        }
    }
}