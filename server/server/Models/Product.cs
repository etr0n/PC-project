using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }   
        public string Category { get; set; }
        public float Price { get; set; }
        public string Speed { get; set; }   
        public string Type { get; set; }    
        public string Color { get; set; }

    }
}
