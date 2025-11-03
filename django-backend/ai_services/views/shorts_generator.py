from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class Shorts_generatorView(APIView):
    def post(self, request):
        return Response({'message': 'shorts_generator endpoint'}, status=status.HTTP_200_OK)
