using System;

namespace Portal.API.DTOs
{
    public class PhotoForReturnDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }     // Opis
        public DateTime DateAdded { get; set; }     // Data dodania
        public bool isMain { get; set; }            // Czy zdjęcie jest główne
        public string Public_id { get; set; }
    }
}