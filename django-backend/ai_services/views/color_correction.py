from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class Color_correctionView(APIView):
    def post(self, request):
        return Response({'message': 'color_correction endpoint'}, status=status.HTTP_200_OK)
