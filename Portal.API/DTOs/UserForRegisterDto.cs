using System;
using System.ComponentModel.DataAnnotations;

namespace Portal.API.DTOs
{
    public class UserForRegisterDto
    {
        [Required(ErrorMessage = "Nazwa użytkownika jest wymagana!")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Hasło jest wymagane!")]
        [StringLength(12, MinimumLength = 6, ErrorMessage = "Hasło musi się składac z od 6 do 12 znaków")]
        public string password { get; set; }
        [Required(ErrorMessage = "Płeć wymagana!")]
        public string Gender { get; set; }
        [Required(ErrorMessage = "Data urodzin wymagana!")]
        public DateTime DateOfBirth { get; set; }
        [Required(ErrorMessage = "Wprowadź nazwę kraju!")]
        public string Country { get; set; }
        [Required(ErrorMessage = "Wprowadź nazwę miasta!")]
        public string City { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastAction { get; set; }

        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastAction = DateTime.Now;
        }

    }
}