
using Microsoft.EntityFrameworkCore;
using Portal.API.Models;

namespace Portal.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options ):base(options)
        {
            
        }

        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Like> Likes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder){
            builder.Entity<Like>().HasKey(k=>new {k.userLikesId, k.userIsLikedId});
            builder.Entity<Like>().HasOne(u=>u.userIsLiked).WithMany(u=>u.UserLikes).HasForeignKey(u => u.userIsLikedId)
            .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Like>().HasOne(u=>u.userLikes).WithMany(u=>u.UserIsLiked).HasForeignKey(u => u.userLikesId)
            .OnDelete(DeleteBehavior.Restrict);
        }

    }
}