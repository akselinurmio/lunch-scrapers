## Deploy

```sh
$ gcloud functions deploy iso-paja-menu --gen2 --region=europe-north1 --source=. --entry-point=getIsoPajaMenu --trigger-http --allow-unauthenticated --memory=1G
```
