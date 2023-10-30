FROM python:3.9-alpine

RUN mkdir /API

WORKDIR /API


COPY . /API/

RUN pip3 install -r /API/requirements.txt

EXPOSE 5000

CMD ["python", "main.py"]