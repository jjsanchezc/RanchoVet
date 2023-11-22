FROM python:3.9.12


WORKDIR /API

COPY . /API
RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "main.py"]