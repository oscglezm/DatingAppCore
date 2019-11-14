using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DatingApp.APIa.Migrations
{
    public partial class AddedPublicId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateAdded",
                table: "Photos",
                nullable: true,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "PublicID",
                table: "Photos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateAdded",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "PublicID",
                table: "Photos");
        }
    }
}
