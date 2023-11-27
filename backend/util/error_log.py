import sys
import os


def get_error_log_info(e: Exception) -> dict:
    """
    例外情報からエラーログに関する詳細を取得する
    """
    ex_type, ex_value, ex_tb = sys.exc_info()
    fname = os.path.split(ex_tb.tb_frame.f_code.co_filename)[1]
    line_no = str(ex_tb.tb_lineno)
    error_message = str(e)

    return {
        "type": str(ex_type),
        "line_no": line_no,
        "file_name": fname,
        "error_message": error_message,
    }
