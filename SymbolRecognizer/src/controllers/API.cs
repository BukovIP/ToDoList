using Microsoft.AspNetCore.Mvc;
using SymbolRecognizer.Data;

namespace SymbolRecognizer.controllers
{
    public class API : ControllerBase
    {
        public API()
        {

        }

        [HttpPost]
        public IActionResult Recognize([FromBody] Point[] points)
        {
            var pointsSequence = new PointsSequence(points);

            return Ok();
        }
    }
}
