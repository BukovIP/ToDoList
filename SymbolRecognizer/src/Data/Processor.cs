namespace SymbolRecognizer.Data
{
    public class Processor
    {

        public void ProcessPoints(in Point[] points)
        {
            if (points == null)
                throw new ArgumentNullException(nameof(points));

            var ps = new PointsSequence(points);

        }
    }
}
