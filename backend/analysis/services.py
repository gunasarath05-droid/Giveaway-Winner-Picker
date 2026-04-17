import os
from collections import Counter
import re

class AnalysisService:
    def __init__(self):
        pass

    def extract_keywords(self, comments):
        """
        Extracts top keywords from a list of comment texts.
        """
        all_text = " ".join([c['text'] for c in comments]).lower()
        # Simple tokenization
        words = re.findall(r'\w+', all_text)
        # Filter common stop words (very basic list)
        stop_words = {'the', 'a', 'an', 'is', 'are', 'was', 'were', 'to', 'in', 'of', 'for', 'and', 'with', 'on', 'at', 'this', 'that', 'it', 'my', 'your'}
        filtered_words = [w for w in words if w not in stop_words and len(w) > 3]
        
        counter = Counter(filtered_words)
        return dict(counter.most_common(10))

    def analyze_sentiment(self, comments):
        """
        Performs mock sentiment analysis based on simple keywords.
        """
        if not comments:
            return {"positive": 0, "negative": 0, "neutral": 0}

        # Mock sentiment logic based on keywords
        pos_words = {'love', 'great', 'awesome', 'good', 'nice', 'wow', 'best', '🔥', '❤', '👏'}
        neg_words = {'bad', 'hate', 'worst', 'poor', 'terrible', 'slow', 'fake'}
        
        pos_count = 0
        neg_count = 0
        for c in comments:
            text = c['text'].lower()
            if any(w in text for w in pos_words):
                pos_count += 1
            elif any(w in text for w in neg_words):
                neg_count += 1
        
        total = len(comments)
        neutral_count = total - (pos_count + neg_count)
        
        return {
            "positive": round((pos_count / total) * 100, 1) if total > 0 else 0,
            "negative": round((neg_count / total) * 100, 1) if total > 0 else 0,
            "neutral": round((neutral_count / total) * 100, 1) if total > 0 else 0
        }
