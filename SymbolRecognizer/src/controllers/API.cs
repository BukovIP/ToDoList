using Microsoft.AspNetCore.Mvc;
using SymbolRecognizer.Data;
using SymbolRecognizer.Data.mock;

namespace SymbolRecognizer.controllers
{
    public class API : ControllerBase
    {
        private TestDataProvider _testDataProvider;
        public API(TestDataProvider provider)
        {
            _testDataProvider = provider;
        }

        [HttpPost]
        public IActionResult Recognize([FromBody] Point[] points)
        {
            var pointsSequence = new PointsSequence(points);

            return Ok();
        }
        
        [HttpGet(nameof(GetPattern))]
        public Point[] GetPattern()
        {
            return _testDataProvider.GetLine(new TestDataProvider.PatternOptions()
            {
                Range = (0,100),
                Rotation = 2,
            });
        }
    }
}
