using System.ComponentModel.DataAnnotations;

namespace Portal.API.DTOs
{
    public class UserForLoginDto
    {
        [Required(ErrorMessage="Nazwa użytkownika jest wymagana!")]
        public string UserName { get; set; }
        [Required(ErrorMessage="Hasło jest wymagane!")]
       // [StringLength(12,MinimumLength = 6, ErrorMessage="Hasło musi się składac z od 6 do 12 znaków")]
        public string password { get; set; }
    }
}