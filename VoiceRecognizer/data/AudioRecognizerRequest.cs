namespace VoiceRecognizer.data;

public class AudioRecognizerRequest
{
    private Int32? ChannelCount { get; set; }
    private Int32? SampleRate { get; set; }
    private Int32? SampleSize { get; set; }
    private byte[]? Data { get; set; }
}