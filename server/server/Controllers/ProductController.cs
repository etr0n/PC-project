using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Pagination;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductDbContext _context;

        public ProductController(ProductDbContext context)
        {
            _context = context;
        }

        // GET: api/Product
        [HttpGet]
        public async Task<Tuple<ActionResult<IEnumerable<Product>>, int>> GetProducts(string? search, string? sort, int? pageNumber)
        {
            if (_context.Products == null)
            {
               Tuple <ActionResult<IEnumerable<Product>>, int> tuple = new Tuple<ActionResult<IEnumerable<Product>>, int>(null, 0);
                return tuple;
            }

            if (search == "")
            {
                pageNumber = 1;
            }

            var products = from p in _context.Products
                           select p;

            var count = products.Count();   

            if (!String.IsNullOrEmpty(search) && search != "")
            {
                products = products.Where(p =>
                p.Manufacturer.Contains(search) ||
                p.Category.Contains(search) ||
                p.Model.Contains(search));

                count = products.Count();
            }
              
            switch (sort)
            {
                case "manufacturer_des":
                    products = products.OrderByDescending(p => p.Manufacturer);
                    break;
                default:
                    products = products.OrderBy(p => p.Manufacturer);
                    break;
            }
            int pageSize = 5;

            int TotalPages = (int)Math.Ceiling(count / (double)pageSize);

            var res = await PaginatedList<Product>.CreateAsync(products.AsNoTracking(), pageNumber ?? 1, pageSize);

            return new Tuple<ActionResult<IEnumerable<Product>>, int>(res, TotalPages);
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
          if (_context.Products == null)
          {
              return NotFound();
          }
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // POST: api/Product
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
          if (_context.Products == null)
          {
              return Problem("Entity set 'ProductDbContext.Products'  is null.");
          }
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }
    }
}
