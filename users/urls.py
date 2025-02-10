from django.urls import path
from .views import ProfilePictureUploadView

urlpatterns = [
    path(
        "profile/upload-picture/", 
        ProfilePictureUploadView.as_view(), 
        name="upload-profile-picture"
    ),
]