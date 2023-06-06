import json
import redis
import hashlib
from typing import Any
# Setup Redis client
redis_client = redis.Redis(host='redis', port=6379, db=0)

class Cache():
    def __init__(self, ttl=600, *args, **kwargs):
        self.ttl = ttl
        self.key = self.generate_cache_key(*args, **kwargs)
            
    def get_cache(self) -> Any:
        try:
            cached_data = self.redis_client.get(self.key)
            return json.loads(cached_data) if cached_data else None
        except Exception as e:
            print(f"Error getting cache: {e}")
            return None

    def exists(self) -> bool:
        try:
            return redis_client.exists(self.key)
        except Exception as e:
            print(f"Error checking cache: {e}")
            return False

    def set_cache(self, data: Any):
        try:
            redis_client.setex(self.key, self.ttl, json.dumps(data))
        except Exception as e:
            print(f"Error setting cache: {e}")

    def delete(self):
        try:
            redis_client.delete(self.key)
        except Exception as e:
            print(f"Error deleting cache: {e}")

    @staticmethod
    def generate_cache_key(*args, **kwargs):
        # Create a string that includes all arguments
        args_string = "_".join(str(a) for a in args)
        kwargs_string = "_".join(f"{k}_{v}" for k, v in kwargs.items())

        # Combine both strings
        combined_string = f"{args_string}_{kwargs_string}"

        # Use SHA-256 to generate a unique hash for the combined string
        key_hash = hashlib.sha256(combined_string.encode()).hexdigest()

        return key_hash