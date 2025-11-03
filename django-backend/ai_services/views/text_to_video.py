from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class Text_to_videoView(APIView):
    def post(self, request):
        return Response({'message': 'text_to_video endpoint'}, status=status.HTTP_200_OK)
