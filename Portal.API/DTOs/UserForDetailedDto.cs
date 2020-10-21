using System;
using System.Collections.Generic;
using Portal.API.Models;

namespace Portal.API.DTOs
{
    public class UserForDetailedDto
    {
         public int Id { get; set; }
        public string UserName { get; set; }
     

        public string Gender { get; set; }
        public DateTime Age { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastAction { get; set; }
        public string Country { get; set; }
        public string City { get; set; }


        public string Growth { get; set; }
        public string EyeColor { get; set; }
        public string HairColor { get; set; }
        public string MartialStatus { get; set; }
        public string Edukation { get; set; }
        public string Profession { get; set; }
        public string Children { get; set; }
        public string Languages { get; set; }

        public string Description { get; set; }
        public string Personality { get; set; }
        public string LookingFor { get; set; }


        public string Interests { get; set; }
        public string FreeTime { get; set; }

        public string ILike { get; set; }
        public string IDontLike { get; set; }

        public ICollection<Photo> Photos { get; set; }
        public string PhotoUrl { get; set; }
    
    }
}