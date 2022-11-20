using SymbolRecognizer.Data;
using System.Runtime.CompilerServices;

namespace SymbolRecognizer.Data
{
    public class PointsSequence
    {
        private readonly IBounds _bounds;
        private readonly Point[] _points;
        private readonly double[] _angles;

        public PointsSequence(Point[] points)
        {
            //first for
            _bounds = GetBounds(in points);

            //second for
            _points = Normalize(in points, _bounds);

            //third for
            _angles = GetAngles(in points);
        }

        private static IBounds GetBounds(in Point[] points)
        {
            int minx = 0;
            int maxx = 0;
            int miny = 0;
            int maxy = 0;

            for (int i = 0; i < points.Length; i++)
            {
                var p = points[i];
                if (p.X < minx)
                    minx = p.X;
                if (p.Y < miny)
                    miny = p.Y;
                if (p.X > maxx)
                    maxx = p.X;
                if (p.Y > maxx)
                    maxx = p.Y;
            }

            var x = maxx - minx;
            var y = maxy - miny;

            return new Bounds()
            {
                MinX = minx,
                X = x,
                MinY = miny,
                Y = y
            };
        }

        private Point[] Normalize(in Point[] points, IBounds bounds)
        {
            for (int i = 0; i < points.Length; i++)
            {
                var x = points[i].X -= bounds.MinX;
                var y = points[i].Y -= bounds.MinY;

                var normalizedX = x / (double)bounds.X;
                var normalizedY = y / (double)bounds.Y;
            }

            return points;
        }

        private double[] GetAngles(in Point[] points)
        {
            if (points.Length == 0)
                return new double[0];

            var angles = new double[points.Length - 1];

            Point prev = points[0];
            for (int i = 1; i < points.Length; i++)
            {
                var point = points[i];
                var angle = GetAngle(in prev, in point);
                _angles[i - 1] = angle;
                prev = point;
            }
            return angles;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        private static double GetAngle(in Point f, in Point s)
        {
            return Math.Atan2(f.X - s.X, f.Y - s.Y);
        }
    }
}
