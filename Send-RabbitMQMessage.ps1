param(
    [Parameter(Mandatory = $true)] [PSObject] $Message
)
$credentials = [System.Convert]::ToBase64String([System.Text.Encoding]::ASCII.GetBytes('admin:admin'))
$headers = @{
    Authorization = "Basic $credentials"
}
$payload = @{
    properties = @{
        content_type = 'application/json'
        delivery_mode = 1
    }
    routing_key = ''
    payload = $Message | ConvertTo-Json
    payload_encoding = 'string'
}
$body = $payload | ConvertTo-Json
$contentType = 'application/json'
$uri = 'http://localhost:15672/api/exchanges/%2f/amq.fanout/publish'
Invoke-RestMethod -Uri $uri -Method Post -Headers $headers -Body $body -ContentType $contentType
