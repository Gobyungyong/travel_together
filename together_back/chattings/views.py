from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ParseError, NotFound, PermissionDenied
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .serializers import ConversationSerializer
from .models import Conversation


class Conversations(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        conversations = Conversation.objects.filter(name__contains=request.user)

        if not conversations.exists():
            raise NotFound("채팅방이 없습니다.")

        return Response(
            ConversationSerializer(
                conversations,
                context={"user": request.user, "request": request},
                many=True,
            ).data,
            status=status.HTTP_200_OK,
        )
