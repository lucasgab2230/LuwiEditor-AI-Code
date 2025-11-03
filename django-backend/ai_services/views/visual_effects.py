from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class Visual_effectsView(APIView):
    def post(self, request):
        return Response({'message': 'visual_effects endpoint'}, status=status.HTTP_200_OK)
