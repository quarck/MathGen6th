import re 


css_re = re.compile(r'^.*<link\s+rel="stylesheet"\s+type="text/css"\s+href="(.+\.css)">')
js_re = re.compile(r'^.*<script\s+language="JavaScript"\s+src="(.+)"></script>')


def inline_file(fout, fname, op, cl):

    print (op, file=fout)

    with open(fname) as ff: 
        for l in ff.readlines(): 
            l = l.rstrip()
            if l.startswith('//') and fname.endswith('.js'): # skip JS comments  
                continue
            print(l, file=fout)

    print (cl, file=fout)


with open('index.out.html', 'w') as f_out:

    print("<!-- This file was concatenated by the automated tool. Original source at: https://github.com/quarck/MathGen6th -->", file=f_out)

    with open("index.html") as f: 
        for l in f.readlines(): 
            l = l.rstrip()
            css_m = css_re.match(l)
            js_m = js_re.match(l)
            if css_m: 
                inline_file (f_out, css_m.group(1), "<style>", "</style>")
            elif js_m: 
                inline_file(f_out, js_m.group(1), "<script language=\"JavaScript\">", "</script>")
                pass
            else: 
                print(l, file=f_out)

