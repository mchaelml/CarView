using Microsoft.EntityFrameworkCore;
using vega.Core.Models;
using vega.Models;

namespace vega.Persistance
{
    public class VegaDbContext : DbContext
    {
        public DbSet<Make> Makes { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public VegaDbContext(DbContextOptions<VegaDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelbuild)
        {
            modelbuild.Entity<VehicleFeature>().HasKey(vf => new { vf.VehicleId, vf.FeatureId });
        }
    }
}