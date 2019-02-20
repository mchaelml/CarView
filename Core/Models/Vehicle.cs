using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using vega.Core.Models;

namespace vega.Models
{
    [Table("Vehicles")]
    public class Vehicle
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        [Required]
        public int ModelId { get; set; }
        public Model Model { get; set; }
        public bool isRegistered { get; set; }
        [Required]
        [StringLength(255)]
        public string ContactName { get; set; }
        [Required]
        [StringLength(255)]
        public string ContactPhone { get; set; }
        public string ContactEmail { get; set; }
        public DateTime LastUpdated { get; set; }
        public ICollection<VehicleFeature> Features { get; set; }
        public ICollection<Photo> Photos { get; set; }

        public Vehicle()
        {
            Features = new Collection<VehicleFeature>();
            Photos = new Collection<Photo>();
        }

    }
}