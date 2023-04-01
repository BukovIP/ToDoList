FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["VoiceRecognizer/VoiceRecognizer.csproj", "VoiceRecognizer/"]
RUN dotnet restore "VoiceRecognizer/VoiceRecognizer.csproj"
COPY . .
WORKDIR "/src/VoiceRecognizer"
RUN dotnet build "VoiceRecognizer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "VoiceRecognizer.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "VoiceRecognizer.dll"]
