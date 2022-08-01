import base64
import requests

pdf_data = open('test.pdf', 'rb').read()

r = requests.post('http://localhost:3000/api/ocr', json={
    'pdf': base64.b64encode(pdf_data).decode('utf-8')
})

print(r.json())