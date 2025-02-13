using FlightArround.Server.Models;
using k8s.KubeConfigModels;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace FlightArround.Server.Data
{
    public class FlightArroundContext : DbContext
    {
        public FlightArroundContext(DbContextOptions<FlightArroundContext> options) : base(options)
        { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Models.User>()
                .HasIndex(c => c.UserName)
                .IsUnique();

            modelBuilder.Entity<Models.User>()
                .HasIndex(c => c.Email)
                .IsUnique();

            modelBuilder.Entity<Customers>()
                .HasIndex(c => c.PassportNo)
                .IsUnique();

            modelBuilder.Entity<Customers>()
                .HasIndex(c => c.Email)
                .IsUnique();

            modelBuilder.Entity<Country>()
                .HasMany(e => e.Cities)
                .WithOne(e => e.Country)
                .HasForeignKey(e => e.Id)
                .IsRequired();
        }

        public DbSet<Customers> Customers { get; set; }
        public DbSet<Models.User> Users { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Travel> Travels { get; set; }
        public DbSet<Ticket> Tickets { get; set; }

    }
}
