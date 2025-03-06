using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FlightArround.Server.Migrations
{
    /// <inheritdoc />
    public partial class ChangeColumnsName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TravlTime",
                table: "Travels",
                newName: "TravelTime");

            migrationBuilder.RenameColumn(
                name: "TravlDate",
                table: "Travels",
                newName: "TravelDate");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TravelTime",
                table: "Travels",
                newName: "TravlTime");

            migrationBuilder.RenameColumn(
                name: "TravelDate",
                table: "Travels",
                newName: "TravlDate");
        }
    }
}
