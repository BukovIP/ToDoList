namespace SymbolRecognizer.Data.mock;

public class TestDataProvider
{
    public Point[] GetLine(PatternOptions options)
    {

        var result = Enumerable
            .Range(options.Range.Start,options.Range.Count)// range x
            .Select(x=>new Point()
            {
                X = options.Shift.X + x,
                Y = (int)(options.Shift.Y + x * options.Rotation)
            })
            // .Select() todo: add noise
            ;

        return result.ToArray();
    }

    public Point[] GetTriangle(PatternOptions options)
    {
        throw new NotImplementedException();
    }

    public Point[] GetSquare(PatternOptions options)
    {
        throw new NotImplementedException();
    }

    public Point[] GetCircle(PatternOptions options)
    {
        throw new NotImplementedException();
    }

    public class PatternOptions
    {
        public float Rotation { get; set; }
        public Point Shift { get; set; }
        public float Noise { get; set; }
        public (int Start, int Count) Range { get; set; }
    }
}