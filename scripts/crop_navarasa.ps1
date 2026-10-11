Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\deepa\Downloads\iks chat bot\natya-ai\src\assets\cultural\navarasa_grid_sowmya.jpg"
$outDir = "c:\Users\deepa\Downloads\iks chat bot\natya-ai\src\assets\cultural"

$img = [System.Drawing.Image]::FromFile($srcPath)
Write-Host "Image size: $($img.Width) x $($img.Height)"

$cellW = [int]($img.Width / 3)
$cellH = [int]($img.Height / 3)

$rasas = @(
    @("rasa_shringara.jpg", 0, 0),
    @("rasa_hasya.jpg", 1, 0),
    @("rasa_karuna.jpg", 2, 0),
    @("rasa_raudra.jpg", 0, 1),
    @("rasa_veera.jpg", 1, 1),
    @("rasa_bhayanaka.jpg", 2, 1),
    @("rasa_bibhatsa.jpg", 0, 2),
    @("rasa_adbhuta.jpg", 1, 2),
    @("rasa_shanta.jpg", 2, 2)
)

foreach ($item in $rasas) {
    $filename = $item[0]
    $col = $item[1]
    $row = $item[2]

    $x = $col * $cellW
    $y = $row * $cellH

    $cropRect = New-Object System.Drawing.Rectangle($x, $y, $cellW, $cellH)
    $targetBmp = New-Object System.Drawing.Bitmap($cellW, $cellH)
    $graphics = [System.Drawing.Graphics]::FromImage($targetBmp)
    $graphics.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $cellW, $cellH)), $cropRect, [System.Drawing.GraphicsUnit]::Pixel)

    $destPath = Join-Path $outDir $filename
    $targetBmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $graphics.Dispose()
    $targetBmp.Dispose()
    Write-Host "Created $filename ($cellW x $cellH)"
}

$img.Dispose()
Write-Host "All 9 Navarasa crops completed successfully."
