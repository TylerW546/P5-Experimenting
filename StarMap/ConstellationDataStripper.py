file_path = 'StarMap/ConstellationBounds/centers_20.txt'
with open(file_path, 'r') as f:
    lines = f.readlines()

# The end of each data section, where first byte is 1, not 0
data_ends = [10,12,21,29,32,37]
data_labels = ["RAhr", "DEsign", "DEdeg","Area","Rank","Con"]
last = data_ends[len(data_ends) -1]

class Center():
    def __init__(self, string):
        self.data = {}
        
        ptr = 0
        
        i = 0
        while ptr < last:
            self.data[data_labels[i]] = string[ptr:data_ends[i]].strip()
            ptr = data_ends[i]
            i+=1

    def __str__(self):
        return str(self.data)

constellations = []
for line in lines:
    constellations.append(Center(line))

with open("StarMap/contellation_centers.txt", "w") as o:
    for const_obj in constellations:
        try:
            o.write("new Constellation(name=\""+const_obj.data["Con"]+"\", right_ascension="+str(float(const_obj.data["RAhr"]))+", declination="+const_obj.data["DEsign"]+str(float(const_obj.data["DEdeg"]))+")");
            o.write(";\n")
        except:
            pass
            



