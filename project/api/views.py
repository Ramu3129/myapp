from django.http import JsonResponse
import nltk

def calculate_ngrams(text, n=3):
    words = nltk.word_tokenize(text)
    ngrams = list(nltk.ngrams(words, n))
    return ngrams

def compare_ngrams(text1, text2):
    ngrams1 = calculate_ngrams(text1)
    ngrams2 = calculate_ngrams(text2)
    common_ngrams = set(ngrams1) & set(ngrams2)
    return list(common_ngrams)

def ngrams_comparison(request):
    if request.method == 'POST':
        try:
            data = request.POST
            text1 = data['texts'][0]
            text2 = data['texts'][1]

            common_ngrams = compare_ngrams(text1, text2)
            return JsonResponse({'common_ngrams': common_ngrams})
        except Exception as e:
            return JsonResponse({'error': 'Invalid input'}, status=400)
    else:
        return JsonResponse({'error
