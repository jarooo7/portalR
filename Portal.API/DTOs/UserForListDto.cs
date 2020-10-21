using System;

namespace Portal.API.DTOs
{
    public class UserForListDto
    {
          public int Id { get; set; }
        public string UserName { get; set; }

        public string Gender { get; set; }
        public DateTime Age { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastAction { get; set; }
        public string Country { get; set; }
        public string City { get; set; }

        public string PhotoUrl { get; set; }
    }
}