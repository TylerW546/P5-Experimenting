file_path = 'StarMap/bsc5.dat'
with open(file_path, 'r') as f:
    lines = f.readlines()

# The end of each data section, where first byte is 1, not 0
data_ends = [4,14,25,31,37,41,42,43,44,49,51,60,62,64,68,69,71,73,75,77,79,83,84,86,88,90,96,102,107,108,109,114,115,120,121,126,127,147,148,154,160,161,166,170,174,176,179,180,184,190,194,196,197]
data_labels = ["Hr", "Name", "DM", "HD", "SAO", "FK5", "IRflag", "r_IRflag", "Multiple", 
               "ADS", "ADScomp", "VarID", "RAh1900", "RAm1900", "RAs1900", "DE-1900", "DEd1900", 
               "DEm1900", "DEs1900", "RAh", "RAm", "RAs", "DE-", "DEd", "DEm", "DEs", "GLON", 
               "GLAT", "Vmag", "n_VMag", "u_Vmag", "B-V", "u_B-V", "U-B", "u_U-B", "R-I", 
               "n_R-I", "SpType", "n_SpType", "pmRA", "pmDE", "n_Parallax", "Parallax", 
               "RadVel", "n_Rad_Vel", "l_RotVel", "RotVel", "u_RotVel", "Dmag", 
               "Sep", "MultID", "MultCnt", "NoteFlag"]
last = data_ends[len(data_ends) -1]

class Star():
    def __init__(self, string):
        self.data = {}
        
        ptr = 0
        
        i = 0
        while ptr < last:
            self.data[data_labels[i]] = string[ptr:data_ends[i]]
            ptr = data_ends[i]
            i+=1

    def __str__(self):
        return str(self.data)

stars = []
for line in lines:
    stars.append(Star(line))

def sort_func(obj):
    try:
        return float(obj.data["Vmag"])
    except:
        return 0

stars.sort(key=sort_func, reverse=False)

with open("StarMap/output.txt", "w") as o:
    for star_obj in stars[0:2000]:
        try:
            o.write("new Star(name=\""+star_obj.data["Name"]+"\", latitude="+str(float(star_obj.data["GLAT"]))+", longitude="+str(float(star_obj.data["GLON"]))+", magn="+str(float(star_obj.data["Vmag"]))+")");
            o.write(";\n")
        except:
            pass
            



