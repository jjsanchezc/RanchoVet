FROM python:3.9.12-alpine


WORKDIR /API

COPY . /API

RUN pip3 install -r requirements.txt

EXPOSE 5000

CMD ["python", "main.py"]