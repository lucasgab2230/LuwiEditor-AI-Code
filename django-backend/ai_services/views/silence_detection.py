from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class Silence_detectionView(APIView):
    def post(self, request):
        return Response({'message': 'silence_detection endpoint'}, status=status.HTTP_200_OK)
