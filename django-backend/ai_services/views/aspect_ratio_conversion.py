from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class AspectRatioConversionView(APIView):
    def post(self, request):
        return Response({'message': 'aspect_ratio_conversion endpoint'}, status=status.HTTP_200_OK)
