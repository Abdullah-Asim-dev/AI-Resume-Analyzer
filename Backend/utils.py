from pypdf import PdfReader
import docx
import io

def extract_text_from_file(file_bytes: bytes, filename: str) -> str:
    text = ""
    filename_lc = filename.lower()
    
    if filename_lc.endswith('.pdf'):
        pdf_file = io.BytesIO(file_bytes)
        reader = PdfReader(pdf_file)
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
                
    elif filename_lc.endswith('.docx'):
        docx_file = io.BytesIO(file_bytes)
        doc = docx.Document(docx_file)
        for para in doc.paragraphs:
            text += para.text + "\n"
            
    elif filename_lc.endswith('.txt'):
        text = file_bytes.decode("utf-8", errors="ignore")
        
    else:
        raise ValueError("Unsupported file format. Please upload PDF, DOCX, or TXT.")
        
    return text.strip()
