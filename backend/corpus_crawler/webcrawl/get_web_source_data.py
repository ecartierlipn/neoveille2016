import pickle
import glob


list = glob.glob('*.dump')
for f in list:
        rf =pickle.load(open(f, 'rb'))
        print(rf)
