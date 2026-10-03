# Petit serveur local pour prévisualiser le site Plumbio (aucune installation requise).
# Utilisation :  powershell -ExecutionPolicy Bypass -File .\serve.ps1  [-Port 8080]
param([int]$Port = 8080)

$root = $PSScriptRoot
$prefix = "http://localhost:$Port/"
$types = @{
  ".html" = "text/html; charset=utf-8"; ".css" = "text/css; charset=utf-8"
  ".js" = "application/javascript; charset=utf-8"; ".svg" = "image/svg+xml"
  ".png" = "image/png"; ".jpg" = "image/jpeg"; ".jpeg" = "image/jpeg"
  ".webp" = "image/webp"; ".ico" = "image/x-icon"; ".json" = "application/json"
  ".txt" = "text/plain; charset=utf-8"; ".xml" = "application/xml"; ".pdf" = "application/pdf"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Host "Site Plumbio disponible sur $prefix  (Ctrl+C pour arreter)"

try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $path = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart("/")
    if ($path -eq "" -or $path.EndsWith("/")) { $path += "index.html" }
    $file = [IO.Path]::GetFullPath((Join-Path $root $path))

    if ($file.StartsWith($root) -and (Test-Path $file -PathType Leaf)) {
      $bytes = [IO.File]::ReadAllBytes($file)
      $ext = [IO.Path]::GetExtension($file).ToLower()
      $ctx.Response.ContentType = if ($types.ContainsKey($ext)) { $types[$ext] } else { "application/octet-stream" }
      $ctx.Response.StatusCode = 200
    } else {
      $bytes = [Text.Encoding]::UTF8.GetBytes("404 - Page introuvable")
      $ctx.Response.ContentType = "text/plain; charset=utf-8"
      $ctx.Response.StatusCode = 404
    }
    $ctx.Response.ContentLength64 = $bytes.Length
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    $ctx.Response.Close()
    Write-Host "$($ctx.Response.StatusCode)  /$path"
  }
} finally {
  $listener.Stop()
}
