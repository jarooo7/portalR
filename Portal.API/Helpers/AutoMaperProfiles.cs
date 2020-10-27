using System.Linq;
using AutoMapper;
using Portal.API.DTOs;
using Portal.API.Models;

namespace Portal.API.Helpers
{
    public class AutoMaperProfiles:Profile
    {
        public AutoMaperProfiles()
        {
           CreateMap<User, UserForListDto>()
           .ForMember(dest=>dest.PhotoUrl,opt =>{
               opt.MapFrom(src =>src.Photos.FirstOrDefault(p=>p.isMain).Url);
           })
           .ForMember(dest=>dest.Age,opt =>{
               opt.ResolveUsing(src => src.DateOfBirth.CalculateAge());
           }); 
           CreateMap<User, UserForDetailedDto>()
           .ForMember(dest=>dest.PhotoUrl,opt =>{
               opt.MapFrom(src =>src.Photos.FirstOrDefault(p=>p.isMain).Url);
           })
           .ForMember(dest=>dest.Age,opt =>{
               opt.ResolveUsing(src => src.DateOfBirth.CalculateAge());
           });
           CreateMap<Photo, PhotosForDetailedDto>();
            CreateMap<UserForUpdateDto, User>();

        
        }
    }
}