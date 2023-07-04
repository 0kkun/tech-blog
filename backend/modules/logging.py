import logging
from typing import Optional

from env import Env


def select_log_level(log_level: Optional[str]):
    if log_level is None:
        return logging.INFO
    level = log_level.lower()
    if level == 'debug':
        return logging.DEBUG
    elif level == 'info':
        return logging.INFO
    elif level == 'warning':
        return logging.WARNING
    elif level == 'error':
        return logging.ERROR
    elif level == 'critical':
        return logging.CRITICAL
    else:
        return logging.INFO


def init_logging():
    _logger = logging.getLogger(__name__)
    logging.basicConfig(
        level=select_log_level(Env.LOG_LEVEL),
        format='%(asctime)s %(levelname)s [%(module)s@%(funcName)s:%(lineno)d] %(message)s',
    )