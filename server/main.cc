
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <curl/curl.h>
struct string {
  char *ptr;
  size_t len;
};
void init_string(struct string *s) {
  s->len = 0;
  s->ptr = malloc(s->len+1);
  if (s->ptr == NULL) {
    fprintf(stderr, "malloc() failed\n");
    exit(EXIT_FAILURE);
  }
  s->ptr[0] = '\0';
}
size_t writefunc(void *ptr, size_t size, size_t nmemb, struct string *s)
{
  size_t new_len = s->len + size*nmemb;
  s->ptr = realloc(s->ptr, new_len+1);
  if (s->ptr == NULL) {
    fprintf(stderr, "realloc() failed\n");
    exit(EXIT_FAILURE);
  }
  memcpy(s->ptr+s->len, ptr, size*nmemb);
  s->ptr[new_len] = '\0';
  s->len = new_len;

  return size*nmemb;
}
char *getOddiApiResponse(char *url) {
    CURL *curl;
    CURLcode response;
    curl_global_init(CURL_GLOBAL_ALL);
    curl = curl_easy_init();
    struct string s;
    int success = 1;
    if(curl) {
        init_string(&s);
        char url_withKey[2000];
        strcpy(url_withKey, url);
        strcat(url_withKey, "?api_key=" + API_KEY);
        curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "GET");
        curl_easy_setopt(curl, CURLOPT_URL, url_withKey);
        curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);
        curl_easy_setopt(curl, CURLOPT_DEFAULT_PROTOCOL, "https");
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, writefunc);
       curl_easy_setopt(curl, CURLOPT_WRITEDATA, &s);
        response = curl_easy_perform(curl);
        if(response != CURLE_OK) {
            fprintf(stderr, "Request failed: %s\n", curl_easy_strerror(response));
            success = 0;
        }
        curl_easy_cleanup(curl);
    }
    else
       success = 0;
    curl_global_cleanup();
    if(success)
       return s.ptr;
    return NULL;
}
int main(void) {
    char *response = getOddiApiResponse( "https://api.the-odds-api.com/v4/sports");
    printf("%s\n", response);
    free(response);
}
