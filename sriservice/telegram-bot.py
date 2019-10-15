import requests

response = requests.post(
    url='https://api.telegram.org/bot790769646:AAFPB3DXxBHKl-jEpRHGbEghkoDGBWCAY4U/sendPhoto',
    data={'chat_id': 772464777, 'photo': 'http://165.227.110.138/sriservice/captures/captcha24.png'}
).json()