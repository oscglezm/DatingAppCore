using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.APIa.Helpers
{
    public class PaginationHeader
    {

        public int CurrentPage { get; set; }
        public int ItemsPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }

        public PaginationHeader( int currentPage, int itemsPerPage, int totalItems, int totalPages)
        {
            this.CurrentPage = currentPage;
            this.ItemsPage = itemsPerPage;
            this.TotalItems = totalItems;
            this.TotalPages = totalPages;
        }


    }
}
