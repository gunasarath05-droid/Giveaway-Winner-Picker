from rest_framework import serializers

class CommentRequestSerializer(serializers.Serializer):
    url = serializers.URLField(required=True)
    mode = serializers.ChoiceField(choices=['random', 'most_liked', 'ai'], default='random')

class CommentResponseSerializer(serializers.Serializer):
    username = serializers.CharField()
    comment = serializers.CharField()
    likes = serializers.IntegerField()
    score = serializers.FloatField(required=False)
